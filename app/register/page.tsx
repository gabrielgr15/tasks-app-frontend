'use client'
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";


export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isLoading, setIsloading] = useState(false)


  const validatePasswords = (pass1: string, pass2: string) => {
    if (pass1 && pass2 && pass1 != pass2){
      setPasswordError("Passwords don't match")
    } else{
      setPasswordError(null)
    }
  }


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    validatePasswords(newPassword, passwordConfirm)
  }


  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value
    setPasswordConfirm(newConfirmPassword)
    validatePasswords(password, newConfirmPassword)
  }

 
  const handleSubmit = async (event : React.FormEvent) => {
    event.preventDefault()
    setPasswordError(null)
    setGeneralError(null)
    if (password !== passwordConfirm) {
      setPasswordError("Passwords don't match")
      return
    }
    setIsloading(true)
    const result = await register(username, email, password)
    setIsloading(false)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setGeneralError(result.error || 'An unkown error occurred')
    }    
  }
  
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {setUsername(e.target.value)}}
        />
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <Input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Input
          type="password" 
          placeholder="Confirm password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}
        {generalError && (
          <p className="text-red-500 text-sm mt-1">{generalError}</p>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>        
    </Container>
  );
}