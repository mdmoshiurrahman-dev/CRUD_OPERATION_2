import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div>
    <Link href={'/users'}>
    <button className="px-3 py-2 rounded-xl bg-blue-200 m-5">Users</button>
    </Link>
    <Link href={'users/add'}>
    <button className="px-3 py-2 rounded-xl bg-blue-200 m-5">Add user</button>
    </Link>
   </div>
  );
}
