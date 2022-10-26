import { MouseEventHandler, useState, Dispatch, SetStateAction } from "react"

export default function ({ setRoute }: { setRoute: Dispatch<SetStateAction<string>> }) {
  const [name, setName] = useState("___")
  const [email, setEmail] = useState("___")

  const save: MouseEventHandler<HTMLButtonElement> = async ev => {
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





  return <>
    <h1>Alterar dados</h1>
    <h2>Alterar dados do Usuário Logado</h2>
    <div className="containerDiv">
      <label>NOME</label>
      <input name="_name" placeholder="name" />
      </div>
      <div className="containerDiv">
      <label>EMAIL</label>
      <input name="email" placeholder="email" />
      </div>
      <div className="containerDiv">
      <label>SENHA</label>
      <input name="password" type="password" placeholder="password" />
    </div>
    <button onClick={save}>salvar</button>
    <button onClick={logOff}>sair</button>
  </>
}