"use client";

import { signOutFirebase } from "@/lib/auth";
import { removeSession } from "@/actions/auth-actions";

export default function AuthProfile({ session, config }) {
  let user = {
    name: "",
    photoURL: null,
  };
  if (session != null) {
    const userObject = JSON.parse(session);
    user.name = userObject["displayName"];
    user.photoURL = userObject["photoURL"];

    console.log("user", user.photoURL);
  }

  const handleSignOut = async () => {
    await signOutFirebase();
    await removeSession();
  };

  return (
    <div className="dropdown custom-dropdown-profile">
      Hi, {user?.name}
      <img
        onClick={handleSignOut}
        className="h-100 ms-md-1"
        alt="avatar"
        src={
          user?.photoURL != "" && user?.photoURL != null
            ? user?.photoURL.toString()
            : config.avatarPng
        }
        width="28"
        aria-haspopup="true"
        aria-expanded="false"
      />
      <div
        className="dropdown-menu p-0"
        aria-labelledby="dropdownMenuButtonProfile"
      >
        <ul className="custom-notifications">
          <li>
            <a className="d-block">
              <img className="me-1" src={config.profileSvg} />
              <span className="text-sm text-dark mb-0">Profile </span>
            </a>
          </li>
        </ul>
        <div className="text-center py-2">
          <button
            type="button"
            className="btn btn-sm btn-danger w-75 mb-0 mx-3"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
