import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { getUsers, createUser } from "../api/authApi";

export default function Members() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "member">("member");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user?.role === "admin") {
      getUsers().then(setUsers).catch(() => {
        setError("Unable to load users.");
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const newUser = await createUser({ name, email, password, role });
      setUsers((prev) => [...prev, newUser]);
      setSuccess("Member added successfully.");
      setName("");
      setEmail("");
      setPassword("");
      setRole("member");
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to create member.");
    }
  };

  if (user?.role !== "admin") {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-4">Team Members</h1>
        <p className="text-gray-600">
          You do not have permission to access the Members dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Team Members</h1>
        <p className="text-gray-600">
          Manage team members, roles, and access from here.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-700">
          {success}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Add New Member</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "admin" | "member")}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Add Member
            </button>
          </form>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Current Team</h2>
          <div className="space-y-3">
            {users.length === 0 ? (
              <p className="text-gray-500">No members found.</p>
            ) : (
              users.map((member) => (
                <div key={member._id} className="rounded-lg border p-3">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                  <p className="text-sm text-gray-500">Role: {member.role}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
