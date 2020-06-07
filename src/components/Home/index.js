import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions";
import { Row, Col, PageHeader, Button } from "antd";
import BrandName from "../brandName";
import { useAuthStatus } from "../../helpers/customHooks";

const Home = () => {
  const firebase = useFirebase();
  const authed = useAuthStatus();

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
            extra={
              authed
                ? [
                    <Button key="2" type="link">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </Button>,
                    <Button
                      onClick={() => signOut()(firebase)}
                      key="1"
                      type="dashed"
                    >
                      Log out
                    </Button>
                  ]
                : [
                    <Button key="2" type="link">
                      <Link to={"/login"}>Log In</Link>
                    </Button>,
                    <Button key="1" type="dashed">
                      <Link to={"/signup"}>Sign Up</Link>
                    </Button>
                  ]
            }
          />
        </Col>
      </Row>
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
