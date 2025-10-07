"use client";

import ProfileCard from "../custom-ui/profile-card/profile-card";
import { handleContactClick } from "./Hero";

const Profile = () => {
  return (
    <section>
      <div className="relative mt-40">
        <h2 className="text-3xl font-bold uppercase">About Me</h2>
         </div>

      <div className="lg:hidden flex justify-center mt-10 items-center">
        <ProfileCard
          name="Adenuga Abdulrahmon"
          title="Frontend Engineer"
          handle="rahmannugar"
          status="Online"
          showBehindGradient={false}
          contactText="Contact Me"
          avatarUrl="/profile.JPG"
          showUserInfo={true}
          enableTilt={true}
          onContactClick={handleContactClick}
          enableMobileTilt={true}
        />
      </div>
    </section>
  );
};
export default Profile;
