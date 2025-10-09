"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import GlassSurface from "../custom-ui/glass-pill";

const heading = "Experience";

// Add browser detection functions
const getBrowser = () => {
  if (typeof window === "undefined") return "unknown";

  if (/Firefox/.test(navigator.userAgent)) return "firefox";
  if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))
    return "safari";
  return "chrome";
};

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  // State for glass pill visibility and overlay
  const [showOverlay, setShowOverlay] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [browser, setBrowser] = useState("unknown");

  useEffect(() => {
    setBrowser(getBrowser());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Show overlay only when sectionTop < 120 and sectionBottom > 220
      if (sectionTop < 120 && sectionBottom > 220) {
        setShowOverlay(true);
        setFadeOut(false);
      } else if (sectionBottom <= 220 && sectionTop < 120) {
        // Fade out at the end of section
        setShowOverlay(true);
        setFadeOut(true);
      } else {
        setShowOverlay(false);
        setFadeOut(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative mt-28" ref={sectionRef} id="experience">
      <motion.h2
        className="text-4xl font-bold uppercase inline-block"
        initial={{ x: -60, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {heading}
        <span
          aria-hidden
          className="block h-0.5 bg-white mt-1"
          style={{
            width: `calc(${heading.length / 2}ch)`,
          }}
        />
      </motion.h2>

      {/* GlassSurface overlay logic */}
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: fadeOut ? 0 : 1,
            transition: { duration: 0.35, ease: "easeOut" },
          }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          style={{
            position: "fixed",
            top: 150,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            pointerEvents: "none",
            ...(browser !== "chrome" && {
              background: `linear-gradient(135deg, 
          rgba(255, 0, 0, 0.1), 
          rgba(255, 154, 0, 0.1),
          rgba(208, 222, 33, 0.1),
          rgba(79, 220, 74, 0.1),
          rgba(63, 218, 216, 0.1),
          rgba(47, 201, 226, 0.1),
          rgba(28, 127, 238, 0.1),
          rgba(95, 21, 242, 0.1),
          rgba(186, 12, 248, 0.1),
          rgba(251, 7, 217, 0.1)
        )`,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50px",
              backdropFilter: "blur(0.7px) saturate(180%)",
              WebkitBackdropFilter: "blur(0.7px) saturate(180%)",
              boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
            }),
          }}
        >
          {browser === "chrome" && <GlassSurface width="80vw" />}
          {browser !== "chrome" && (
            <div
              style={{
                width: "80vw",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                
              }}
            />
          )}
        </motion.div>
      )}

      <div className="flex flex-col items-start justify-between lg:justify-center gap-8 md:flex-row mt-10 relative z-20">
        <motion.article
          className="cursor-pointer
            flex flex-col gap-6 lg:text-lg h-fit font-semibold
           bg-[#1e1d1d]
            rounded-lg
            px-6 py-8 md:px-10 md:py-10
            w-full
          "
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          djhedn Lorem ipsum dolor sit amet consectetur adipisicing elit. At
          maiores suscipit accusamus numquam minus id ipsum, sunt harum a
          dolorum. Obcaecati et aut iure repellat ad praesentium natus
          exercitationem voluptatibus quaerat iusto quisquam voluptates placeat,
          at eius est tempore. Asperiores, voluptas! Doloremque fuga commodi,
          dignissimos sed nisi voluptatem ullam praesentium nulla consequuntur
          eveniet omnis at. Possimus eligendi dolores corporis harum aliquid.
          Veritatis dolorum repudiandae facere quo officia esse a obcaecati
          officiis in sed inventore eligendi aliquid earum culpa mollitia
          cupiditate omnis, voluptatem, reiciendis repellendus vero laudantium
          eaque. Ipsam minima dolorem repellat nulla in accusamus quas
          cupiditate voluptatibus recusandae minus enim molestias error, quod
          molestiae dolore similique? Expedita quis incidunt libero animi
          quisquam pariatur, quos corrupti omnis sequi adipisci labore
          consequatur. Id nobis odio hic libero pariatur quam ducimus
          voluptatibus consequatur! Architecto reprehenderit laborum eveniet,
          saepe, perferendis eius commodi sit iste, in dolorum ex porro tempora
          fugit culpa ad! Ipsam at perspiciatis debitis porro odit amet
          obcaecati placeat quo? Voluptatem eum minima inventore repellendus
          repudiandae ut, veritatis quidem voluptatum cupiditate dolorem porro?
          Fugiat possimus laborum neque suscipit ipsa ducimus vitae,
          perspiciatis deleniti vero. Corporis quidem earum excepturi est sed
          laudantium cum ea accusantium iste quo iusto inventore unde quam, quia
          eos eius voluptas itaque reprehenderit maiores id expedita? Nihil
          pariatur praesentium amet quas beatae aliquam excepturi vel! Inventore
          unde cumque eligendi rerum nesciunt! Ut voluptas placeat, molestiae
          dolore necessitatibus soluta animi doloremque facilis culpa
          consequatur odit aliquid magnam ratione ullam ipsam facere, ea qui,
          quas hic earum deleniti perspiciatis quo. Molestiae dolore
          necessitatibus earum expedita quisquam provident repudiandae fuga
          excepturi quasi inventore minus, maiores voluptate, velit quidem ea
          ullam corrupti ipsam perspiciatis accusamus nesciunt. Fuga voluptas
          nemo voluptatum veniam unde numquam deleniti officia dignissimos
          explicabo excepturi, inventore quos error assumenda ex. Sint,
          similique quidem tenetur, debitis mollitia eligendi hic ipsam laborum
          sunt magnam quibusdam, corrupti porro perspiciatis eaque id modi?
          Eius, nesciunt perferendis laboriosam impedit sunt optio! Non ratione
          tenetur dicta officiis voluptatum, iure temporibus provident
          consequatur nam culpa illum aperiam necessitatibus nemo animi velit,
          in quod nostrum labore quos voluptatem? Suscipit deleniti officia
          illum soluta sit natus, facere aperiam officiis saepe. Esse impedit
          corrupti neque omnis nostrum, vitae possimus assumenda mollitia
          incidunt sapiente blanditiis ipsa minima labore quo dolorem, tempora
          officiis sed distinctio inventore. Aperiam explicabo ipsa veniam
          deserunt! Fuga error deleniti ad! Ut mollitia dicta dignissimos
          numquam earum, itaque reiciendis perferendis! Repellat consequuntur
          quod, hic culpa facere exercitationem nulla placeat, ducimus facilis
          consectetur iure odio maxime error voluptate sapiente porro sint
          deleniti! Incidunt ullam similique aliquid blanditiis voluptatem
          sapiente modi aperiam, cum quod delectus necessitatibus pariatur,
          deleniti nisi explicabo exercitationem quae expedita laborum porro
          optio? Corporis sapiente aliquam, numquam temporibus ipsam dolor
          provident exercitationem quod fuga ut repudiandae, veritatis iusto
          nemo architecto repellendus optio amet voluptatibus veniam incidunt
          dicta, nisi aspernatur. Eius accusantium molestias ratione laboriosam
          optio velit quibusdam sit. Quam temporibus debitis, in hic itaque
          provident eaque ea quia voluptas, odit sunt quo officiis quas deserunt
          quos. Expedita ipsam hic id magni quae architecto placeat illum eum
          cupiditate aperiam, assumenda, voluptas, sint exercitationem repellat
          aut. Placeat illum dolores, magnam quasi aliquam autem culpa animi
          eaque velit cum aut corrupti libero laudantium fuga error ut, quos
          architecto sit? Maxime ab autem natus sunt similique esse. Velit
          quaerat ea molestias inventore perferendis corrupti non. Aperiam
          deserunt temporibus officiis, necessitatibus ratione optio omnis quis
          mollitia voluptatum quaerat ea sit fugit vero est, facere minima
          repudiandae tempore sed! Eligendi perspiciatis nostrum aperiam totam
          dolore eos, repellendus nisi voluptatum reiciendis nihil. Accusantium
          veritatis ullam quidem aut porro velit debitis ipsa corporis, tenetur
          maiores temporibus quos minima, nobis voluptatum animi dolore nostrum
          totam saepe voluptatem ex natus optio deleniti iste sit? Provident
          consectetur nesciunt, ducimus accusamus minus quae inventore quas
          atque itaque, reiciendis doloribus fugiat incidunt unde architecto?
          Suscipit id numquam animi asperiores sed repudiandae corrupti delectus
          nemo alias, quam voluptatem quos a consequuntur magni ipsa. Nemo ut
          dolores fugit illum, omnis tempora accusantium minima quidem eius
          asperiores expedita laborum ipsum esse cupiditate ad est doloribus,
          assumenda, molestias nulla reprehenderit incidunt illo! Incidunt
          repellendus adipisci molestias, amet voluptates minus eveniet saepe
          aliquam sed fugiat quos error corrupti soluta, rem, vel nulla quam
          excepturi culpa? Eaque tempora tenetur, quod ad inventore officia
          facilis sed nostrum quisquam error consectetur dicta illum, maxime
          soluta deserunt rem exercitationem, at ea. Illo fuga maxime excepturi
          explicabo aspernatur doloribus, ipsam fugit ut doloremque perferendis
          a quo laboriosam dolorum provident cum reprehenderit delectus optio
          in. Natus, ex quaerat aliquid, laboriosam laborum dolore sunt
          obcaecati autem, excepturi provident nulla accusantium adipisci.
          Quisquam iusto labore accusantium neque! Impedit deserunt ducimus
          libero illum officia laborum hic at, quisquam id doloribus nostrum
          dolore placeat esse quibusdam, reprehenderit omnis eaque adipisci
          inventore exercitationem eveniet! Quisquam commodi obcaecati saepe
          fugiat iste architecto natus accusantium omnis, nulla, iure autem vero
          voluptas magnam molestias a. Nemo id quas labore, sint impedit
          delectus deserunt similique optio quisquam adipisci vitae, ratione
          eveniet amet dolores deleniti, possimus molestias! Voluptatem, totam!
          Saepe porro odio dolores. Est, suscipit consequatur aut asperiores
          repellat sed iusto quisquam dolores obcaecati saepe. Fugit animi
          dolore non nostrum aut earum esse veniam, quisquam accusantium
          temporibus minima nulla impedit quibusdam dignissimos expedita
          officia? Omnis quidem molestiae voluptatem neque animi officia
          asperiores eum soluta aperiam, et ad, suscipit, placeat voluptas
          impedit? Illum ad alias ipsam impedit, quod maxime odio veniam magni
          amet quisquam, animi vero veritatis pariatur? Quo a laborum, aperiam
          libero porro tempora fugit perspiciatis maxime debitis quidem ad
          officiis, voluptate delectus id quisquam reprehenderit nemo quas
          nesciunt perferendis iusto dolores. Deleniti ullam non placeat commodi
          sequi aliquid maiores reiciendis quos, totam modi officia aliquam
          mollitia. Provident illum vitae rem tempora. Voluptas autem blanditiis
          eaque omnis non vel quod, cupiditate placeat sunt tempore ipsam est
          dolor fuga. Commodi in error illo nam rem et nostrum odit voluptate
          fugiat obcaecati, molestias natus aspernatur, eius minima
          exercitationem ea quaerat inventore corrupti aliquid. Beatae
          exercitationem vitae optio deleniti earum quaerat, accusantium
          voluptate laboriosam nemo quam sit voluptatibus pariatur fuga enim
          saepe doloribus ducimus iusto quos illo sequi ipsam dolor! Beatae
          ipsum vero deleniti?
        </motion.article>
      </div>
    </section>
  );
};

export default Experience;
