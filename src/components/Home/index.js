import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
import { messaging } from "../../config";
import Fade from "react-reveal/Fade";
// import homeMain from "../../assets/images/home-main.svg";
import homeMain1 from "../../assets/images/home-main-1-flip.svg";
import homeInterface from "../../assets/images/home-interface.svg";
import homePhone from "../../assets/images/home-phone.svg";
import { Link } from "react-router-dom";
import { useAuthStatus } from "../../helpers/customHooks";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const authed = useAuthStatus();
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)",
  });

  useEffect(() => {
    if (messaging) {
      if (
        Notification.permission !== "granted" &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            messaging
              .getToken()
              .then((refreshedToken) => {
                console.log(refreshedToken);
              })
              .catch((e) => console.log(e));
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (messaging) {
      const unsubscribe = messaging.onMessage(
        (payload) => {
          console.log(payload);
        },
        (error) => console.log(error)
      );

      return () => {
        unsubscribe && unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    if (messaging) {
      const unsubscribe = messaging.onTokenRefresh(
        () => {
          messaging
            .getToken()
            .then((refreshedToken) => {
              console.log(refreshedToken);
            })
            .catch((e) => {
              console.log(e);
            });
        },
        (error) => console.log(error)
      );

      return () => {
        unsubscribe && unsubscribe();
      };
    }
  }, []);

  return (
    <>
      <Row
        align="middle"
        justify="center"
        className="home-row mobile-top-padding mb-24"
      >
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="home-left-col"
          order={2}
        >
          <Fade right={isDesktop}>
            <h1 className="home-title">Get first hand experience in coding.</h1>
            <h2 className="home-description">
              Choose from hundreds of coding guides, tutorials and examples to
              learn new technology your heart desires.
            </h2>
            <Link to={authed ? "/dashboard" : "/signup"}>
              <Button type="primary" className="mt-24 mb-24 call-to-action-btn">
                {authed ? "Explore" : "Join CodeLabz"}
              </Button>
            </Link>
          </Fade>
        </Col>
        <Col xs={0} sm={0} md={12} lg={12} order={1} className="home-right-col">
          <Fade left>
            <img
              src={homeMain1}
              alt="Background for auth"
              className="homepage-image"
            />
          </Fade>
        </Col>
      </Row>
      <Row className="light-green-bg home-row" justify="center" align="center">
        <Col cs={24} className="center pt-40 pb-40">
          <h1 className="home-title pl-24 pr-24">Step-by-step instructions</h1>
          <h2 className="home-description pl-24 pr-24">
            Follow them to the dot and you wouldn't miss anything
          </h2>
          <Fade bottom>
            <img
              src={isDesktop ? homeInterface : homePhone}
              alt="Background for auth"
              className="homepage-interface"
            />
          </Fade>
        </Col>
      </Row>
      <Row className="home-row">
        <Col>Feature cards</Col>
      </Row>
    </>
  );
};

export default Home;
