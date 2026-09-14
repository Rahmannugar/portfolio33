import { LexoRank } from "lexorank";
import {
  at,
  defineMigration,
  set,
  unset,
  type MigrationContext,
} from "sanity/migrate";

const createRankForPosition = (position: number) => {
  let rank = LexoRank.min();

  for (let index = 0; index < position; index += 1) {
    rank = rank.genNext().genNext();
  }

  return rank.toString();
};

const findMissingPosition = async (
  documentId: string,
  context: MigrationContext
) => {
  const client = context.client.withConfig({ perspective: "raw" });
  const [legacyOrders, unorderedProjectIds] = await Promise.all([
    client.fetch<number[]>(
      `*[_type == "project" && defined(order)].order`
    ),
    client.fetch<string[]>(
      `*[_type == "project" && !defined(order) && !defined(orderRank)] | order(_createdAt asc)._id`
    ),
  ]);
  const unorderedIndex = unorderedProjectIds.indexOf(documentId);

  if (unorderedIndex === -1) return undefined;

  const occupiedPositions = new Set(
    legacyOrders.filter(
      (order) => Number.isInteger(order) && order >= 1
    )
  );
  let missingPositionIndex = 0;

  for (let position = 1; ; position += 1) {
    if (occupiedPositions.has(position)) continue;
    if (missingPositionIndex === unorderedIndex) return position;
    missingPositionIndex += 1;
  }
};

export default defineMigration({
  title: "Migrate project order to order rank",
  documentTypes: ["project"],

  migrate: {
    async document(document, context) {
      if (typeof document.orderRank === "string") {
        return at("order", unset());
      }

      const legacyOrder = document.order;
      const position =
        typeof legacyOrder !== "number" ||
        !Number.isInteger(legacyOrder) ||
        legacyOrder < 1
          ? await findMissingPosition(document._id, context)
          : legacyOrder;

      if (position === undefined) return at("order", unset());

      return [
        at("orderRank", set(createRankForPosition(position))),
        at("order", unset()),
      ];
    },
  },
});
