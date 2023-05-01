//  import { Principal } from "@difinity/principal";
//  import {custom_greeting_backend} from "../../custom_greeting_backend";
// import { Principal } from "../../../node_modules/@dfinity/candid/lib/cjs/idl";
import { Principal } from "@dfinity/principal";
// import {token} from "/home/apophis51/school/ic-projects/custom_greeting/src/custom_greeting_backend/main.mo"

import * as React from "react";
import { render } from "react-dom";
import { custom_greeting_backend } from "../../declarations/custom_greeting_backend";
import { custom } from "../../declarations/custom_greeting_backend";
import {useState} from "react";

const MyHello = () => {
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [buttonText, setText] = useState("Get Tokens!");
  const [recipientId, setId] = useState("")
  const [amount, setAmount] = useState("");
  const [isTransferDisabled, setTransferDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isHidden, setHidden] = useState(false);

  async function handleClick(){
    const principal = Principal.fromText(inputValue);
    const balance = await custom_greeting_backend.balanceOf(principal);
    setBalance(balance.toLocaleString());
  }

  async function handleFaucet(event){   //will print out id of annonymous principal user
    setDisabled(true);
    const result = await custom_greeting_backend.payOut();
    setText(result);
    setDisabled(false);
    
  }

  async function handleTransfer(event){ //
    setHidden(true);
    setTransferDisabled(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount)
    const result = await custom_greeting_backend.transfer(recipient, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setTransferDisabled(false);
  }

  async function doGreet() {
    const greeting = await custom_greeting_backend.greet(name);
    setMessage(greeting);
  }

  return (
    <div style={{ "fontSize": "30px" }}>
      <div style={{ "backgroundColor": "yellow" }}>
        <p>Greetings, from ICPS!</p>
        <p>
          <img src="/OIG.png" />
          Check your Account Token Balance.
        </p>
      </div>
      <div style={{ margin: "30px" }}>
        <input
          id = "balance-principal-id"
          type = "text"
          placeholder="Enter a Principal ID"
          value = {inputValue}
          onChange={(e) => setInput(e.target.value)}
          />
          <br></br>
          <button onClick={handleClick}
                  >Get Balance!</button>
          
          <br></br>
        <button onClick={handleFaucet}
        disabled = {isDisabled}>{buttonText}</button>
        <br></br>
        <p>This account has a balance of{balanceResult}</p>
        <br></br>
        <legend>Account to Transfer To:</legend>
        <input type = "text"  value = {recipientId} onChange={(e)=> setId(e.target.value)}/>
        <legend>Transfer Amount:</legend>
        <input 
        type = "number"  
        value = {amount} 
        onChange = {(e) => setAmount(e.target.value)}
        disabled = {isTransferDisabled}/>
        <button onClick = {handleTransfer}>Transfer</button>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
};

render(<MyHello />, document.getElementById("app"));
//--------------------------------------------------------------------------------------------------


// import * as React from "react";
// import { render } from "react-dom";
// import { custom_greeting_backend } from "../../declarations/custom_greeting_backend";

// const MyHello = () => {
//   const [name, setName] = React.useState('');
//   const [message, setMessage] = React.useState('');

//   async function doGreet() {
//     const greeting = await custom_greeting_backend.greet(name);
//     setMessage(greeting);
//   }

//   return (
//     <div style={{ "fontSize": "30px" }}>
//       <div style={{ "backgroundColor": "yellow" }}>
//         <p>Greetings, from DFINITY!</p>
//         <p>
//           {" "}
//           Type your message in the Name input field, then click{" "}
//           <b> Get Greeting</b> to display the result.
//         </p>
//       </div>
//       <div style={{ margin: "30px" }}>
//         <input
//           id="name"
//           value={name}
//           onChange={(ev) => setName(ev.target.value)}
//         ></input>
//         <button onClick={doGreet}>Get Greeting!</button>
//       </div>
//       <div>
//         Greeting is: "
//         <span style={{ color: "blue" }}>{message}</span>"
//       </div>
//     </div>
//   );
// };

// render(<MyHello />, document.getElementById("app"));



// import { custom_greeting_backend } from "../../declarations/custom_greeting_backend";

// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");

//   const name = document.getElementById("name").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const greeting = await custom_greeting_backend.greet(name);

//   button.removeAttribute("disabled");

//   document.getElementById("greeting").innerText = greeting;

//   return false;
// });
