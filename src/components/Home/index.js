import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";
import { Row, Col, PageHeader, Button } from "antd";
import BrandName from "../brandName";

const Home = () => {
  const firebase = useFirebase();

  return (
    <div>
      <Row>
        <Col xs={24}>
          <PageHeader
            className="site-page-header"
            title={
              <h3 style={{ color: "#3AAFA9" }} className="brand-font">
                <Link to={"/"}>
                  <BrandName />
                </Link>
              </h3>
            }
            backIcon={false}
            extra={[
              <Button key="2" type="link">
                <Link to={"/login"}>Log In</Link>
              </Button>,
              <Button key="1" type="dashed">
                <Link to={"/signup"}>Sign Up</Link>
              </Button>,
            ]}
          />
        </Col>
      </Row>
      <p>This is home</p>
      <br />
      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/signup"}>Sign Up</Link>
      <br />
      <button onClick={() => signOut()(firebase)}>Log out</button>
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
