import { doLogout } from "@/actions/auth-actions";

export default function ButtonLogout({children}) {
  return (
    <form action={doLogout}>
      <button type="submit">{children}</button>
    </form>
  );
}
