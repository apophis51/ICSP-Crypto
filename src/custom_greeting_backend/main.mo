import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

// actor {
//   public query func greet(name : Text) : async Text {
//     return "Hello, " # name # "!";
//   };
// };

actor Token {
  var owner : Principal = Principal.fromText("vzscq-mcwuk-dhp3s-cq5lc-pq35t-gizxf-jah3t-g2qwg-67aqn-igzi7-oae");
  var totalSupply : Nat = 1000000;  //set inital value to 1 million
  var symbol : Text = "ICSP";  //insane clown posse Coin

  var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash ); //keep track of who has 
  //Motoko Uses hashmaps known as hashtables in other languages as dictionary to map values and have no explicit datatypes

  balances.put(owner, totalSupply);  //owner principal added to the ledger balance

  public query func balanceOf(who: Principal) : async Nat {   
    //balance of needs a principal datatype
  //OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""         -use with default
  //dfx canister call custom_greeting_backend balanceOf "($OWNER_PUBLIC_KEY )"

    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };


    return balance;
    }
  };

//principal identitfies users and canisters

//my principal id is zfugt-yywrc-vpmct-x4hfb-gbhxd-iakrd-f5v46-tfgat-uk3he-6vaxu-fqe
//default vzscq-mcwuk-dhp3s-cq5lc-pq35t-gizxf-jah3t-g2qwg-67aqn-igzi7-oae