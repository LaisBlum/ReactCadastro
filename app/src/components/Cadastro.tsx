import { Dispatch, FormEventHandler, SetStateAction } from "react";

export default function ({ setRoute }: { setRoute: Dispatch<SetStateAction<string>> }) {
  const enviarDados: FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault()
    const { _name, email, password } = ev.currentTarget

    const request = await fetch(`/api/user/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: _name.value,
        email: email.value,
        password: password.value
      })
    })

    if (request.status >= 200 && request.status <= 299) {
      alert("PARABAEINZ!")
      setRoute("login")
      return
    }

    const responseData = await request.json()
    
    if (responseData.error) {
      alert(responseData.error)
      return
    }

    alert("Cara! deu um erro tão foda, que eu nem sei o que foi!")
  }

  return <>
    <form className="container" onSubmit={enviarDados}>
      <h1>Cadastro</h1>
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

      <div className="containerBtns">
      <button className="containerBtn" onClick={() => setRoute("login")}>Voltar</button>
      <button className="containerBtn">cadastrar-se</button>
      </div>
    </form>
  </>
}