import { useAuthStore } from "../../store/authStore";

export default function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex justify-between items-center bg-white border-b px-6 py-4">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="text-right">
        <p className="font-medium">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.role}
        </p>
      </div>
    </header>
  );
}