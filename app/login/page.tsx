'use client';
import Container from "@/components/Container";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";



export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event : React.FormEvent) => {
    event.preventDefault();
    try{
      const response = await fetch('task-app-api-gateway-production.up.railway.app/api/users/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('authToken', data.accessToken)
        login(email, password);
        router.push('/dashboard');
      }
      else {
        
      }  
    }catch (error){
      
    }
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email address"
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value = {password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
}