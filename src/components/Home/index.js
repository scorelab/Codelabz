import React from "react";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";
import BrandName from "../brandName";
import { useAuthStatus } from "../../helpers/customHooks";
import MiniNavbar from "../MiniNavbar";

const Home = () => {
  const firebase = useFirebase();
  const authed = useAuthStatus();

  return (
    <div>
      <MiniNavbar authed={authed} signout={() => signOut()(firebase)} />
      <h2>
        Welcome to <BrandName />
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia porro
        tempore blanditiis excepturi amet quo doloremque eaque distinctio,
        numquam ullam accusantium consequuntur veritatis ut temporibus obcaecati
        quia! Quaerat, dolorum ducimus?
      </p>
    </div>
  );
};

export default Home;
