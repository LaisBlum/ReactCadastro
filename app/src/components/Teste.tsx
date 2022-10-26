import { MouseEventHandler, useState, Dispatch, SetStateAction } from "react"
import AlterarDados from "./AlterarDados"

export default function ({ setRoute }: { setRoute: Dispatch<SetStateAction<string>> }) {
  const [name, setName] = useState("___")
  const [email, setEmail] = useState("___")

  const buscarDados: MouseEventHandler<HTMLButtonElement> = async ev => {
    ev.preventDefault()
    const request = await fetch(`/api/logged/${localStorage.getItem('token')}`)

    if (request.status >= 200 && request.status <= 299) {
      const user = await request.json()
      setName(user.name)
      setEmail(user.email)
      return
    }

    alert("OooOohoO, você não fez o login :/")
    setRoute("login")
  }

  const logOff: MouseEventHandler<HTMLButtonElement> = async ev => {
    ev.preventDefault()
    const request = await fetch(`/api/logged/${localStorage.getItem('token')}`)

    if (request.status >= 200 && request.status <= 299) {
      console.log("opa :)")
      localStorage.removeItem('token')
      alert("Desconectado :O")
      setRoute("login")
      return
    }

    alert("OooOohoO, você não fez o login :/")
    setRoute("login")
  }

  const alterarDados: MouseEventHandler<HTMLButtonElement> = async ev => {
    ev.preventDefault()
    const request = await fetch(`/api/logged/${localStorage.getItem('token')}`)

    if (request.status >= 200 && request.status <= 299) {
      console.log("opa :)")
      localStorage.removeItem('token')
      alert("switch switch")
      setRoute("alterardados")
      return
    }

    alert("OooOohoO, você não fez o login :/")
    setRoute("login")
  }

  return <>
    <h1>teste</h1>
    <h2>Buscar dados do Usuário Logado</h2>
    <div>
      <label>Nome: </label>{name}
    </div>
    <div>
      <label>Email: </label>{email}
    </div>
    <button onClick={buscarDados}>buscar</button>
    <button onClick={logOff}>sair</button>
    <button onClick={alterarDados}>alterar dados</button>
  </>
}