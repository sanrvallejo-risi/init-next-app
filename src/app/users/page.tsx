"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {

    const [users, setUsers] = useState<any[]>([]);
    const [editigUser, setEditingUser] = useState<any | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    async function fetchUsers() {
        const res = await fetch('/api/users');
        const data = await res.json();

        setUsers(data);
    }

    async function startEdit(user: any) {
        setEditingUser(user);
        setName(user.name);
        setEmail(user.email);
    }

    async function updateUser(e: React.FormEvent) {
        e.preventDefault()
        await fetch('/api/users', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editigUser.id, name, email })
        });

        setEditingUser(null);
        setName("");
        setEmail("");

        fetchUsers();
    }

    async function deleteUser(id: number) {
        const res = await fetch('/api/users', {
            method: 'DELETE',
            headers: { "COntent-Type": "application/json" },
            body: JSON.stringify({ id })
        });

        fetchUsers();
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <main>
            <h1>Lista de usuarios</h1>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            <strong>{user.name}</strong> — {user.email}
                        </Link>
                        <button onClick={() => startEdit(user)}>Editar</button>
                        <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {editigUser && (
                <form onSubmit={updateUser}>
                    <h1>Editando el usuario {editigUser.name}</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nombre"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={() => setEditingUser(null)}>Cancelar</button>
                </form>
            )}

            <Link href="/">Regresar</Link>
        </main>
    );
}