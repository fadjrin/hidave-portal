import { doSocialLogin } from "@/actions/auth-actions";

export default function ButtonGoogle({ config }) {
  return (
    <form action={doSocialLogin}>
      <button
        type="submit"
        name="action"
        value="google"
        className="btn btn-sm btn-outline-primary w-100 mt-4 mb-0"
      >
        Login with Google
        <img
          src={config.googleLogo}
          width="12"
          style={{
            marginLeft: "3px",
            display: "inline-block",
          }}
        />
      </button>
    </form>
  );
}
