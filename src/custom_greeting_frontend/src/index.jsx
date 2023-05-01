//  import { Principal } from "@difinity/principal";
//  import {custom_greeting_backend} from "../../custom_greeting_backend";
// import { Principal } from "../../../node_modules/@dfinity/candid/lib/cjs/idl";
import { Principal } from "@dfinity/principal";
import {AuthClient} from "@dfinity/auth-client";
// import {token} from "/home/apophis51/school/ic-projects/custom_greeting/src/custom_greeting_backend/main.mo"

import * as React from "react";
import { render } from "react-dom";
import { custom_greeting_backend } from "../../declarations/custom_greeting_backend";
import { custom } from "../../declarations/custom_greeting_backend";
import {useState} from "react";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
  <div>
    <span className="footer-title">Services</span> 
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </div>
</footer>
  );
};

const MyHello = () => {
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [buttonText, setText] = useState("Get 10,000 Free Tokens!");
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
    <div style={{ "fontSize": "30px" }} className = "flex-col px-96 text-5xl">
      <div style={{ "backgroundColor": "grey" }} className = "justify-center">
        <p className="text-red-300 text-center"><b>ICSP - Insane Clown Shiba Posse Coin - Beta Edition</b></p>
        <p className="text-red-300 text-center">
          <img src="/OIG.png" />
        </p>
      </div>
      <div style={{ margin: "30px" }} className = "text-center">
        <p>Check your Account Token Balance.</p>
        <input
        
          id = "balance-principal-id"
          className="input input-bordered w-full max-w-xs"
          type = "text"
          placeholder="Enter a Principal ID"
          value = {inputValue}
          onChange={(e) => setInput(e.target.value)}
          />
          <br></br>
          <button className ="btn"
          onClick={handleClick}
                  >Get Balance!</button>
          
          <br></br>
        <button className ="btn" onClick={handleFaucet}
        disabled = {isDisabled}>{buttonText}</button>
        <br></br>
        <p>This account has a balance of: </p>
        <br></br>
        <p>{balanceResult}</p>
        <br></br>
        <legend>Account to Transfer To:</legend>
        <input type = "text"  
        className="input input-bordered w-full max-w-xs"
        value = {recipientId} 
        onChange={(e)=> setId(e.target.value)}/>
        <legend>Transfer Amount:</legend>
        <input 
        className="input input-bordered w-full max-w-xs"
        type = "number"  
        value = {amount} 
        onChange = {(e) => setAmount(e.target.value)}
        disabled = {isTransferDisabled}/>
        <br></br>
        <button className ="btn" onClick = {handleTransfer}>Transfer</button>
        <p hidden={isHidden}>{feedback}</p>
      </div>
      <Footer />
    </div>
  );
};


// const init = async () => {
// const authClient = await AuthClient.create();
// await authClient.login({
//   identityProvider: "https://identity.ic0.app/#authorize",
//   onSuccess: async () => {
    render(
    <MyHello />, document.getElementById("app")
    );
//   }
// });
// }
// init();
//--------------------------------------------------------------------------------------------------


