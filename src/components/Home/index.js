import React, { useEffect } from "react";
import BrandName from "../brandName";
import { Card, Row, Col } from "antd";
import { messaging } from "../../config";

const Home = () => {
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
      <Card bordered={false}>
        <Row justify="center">
          <Col xs={24} md={8} />
          <Col xs={24} md={8}>
            <h2 style={{ textAlign: "center" }}>
              Welcome to <BrandName />
            </h2>
          </Col>
          <Col xs={24} md={8} />
        </Row>

        <Row gutter={[16, 16]}>
          <Col size={6}>
            <Card>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia porro tempore blanditiis excepturi amet quo doloremque
                eaque distinctio, numquam ullam accusantium consequuntur
                veritatis ut temporibus obcaecati quia! Quaerat, dolorum
                ducimus?
              </p>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia porro tempore blanditiis excepturi amet quo doloremque
                eaque distinctio, numquam ullam accusantium consequuntur
                veritatis ut temporibus obcaecati quia! Quaerat, dolorum
                ducimus?
              </p>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia porro tempore blanditiis excepturi amet quo doloremque
                eaque distinctio, numquam ullam accusantium consequuntur
                veritatis ut temporibus obcaecati quia! Quaerat, dolorum
                ducimus?
              </p>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia porro tempore blanditiis excepturi amet quo doloremque
                eaque distinctio, numquam ullam accusantium consequuntur
                veritatis ut temporibus obcaecati quia! Quaerat, dolorum
                ducimus?
              </p>
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Card>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia porro tempore blanditiis excepturi amet quo doloremque
                eaque distinctio, numquam ullam accusantium consequuntur
                veritatis ut temporibus obcaecati quia! Quaerat, dolorum
                ducimus?
              </p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia porro tempore blanditiis excepturi amet quo doloremque
                eaque distinctio, numquam ullam accusantium consequuntur
                veritatis ut temporibus obcaecati quia! Quaerat, dolorum
                ducimus?
              </p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia porro tempore blanditiis excepturi amet quo doloremque
                eaque distinctio, numquam ullam accusantium consequuntur
                veritatis ut temporibus obcaecati quia! Quaerat, dolorum
                ducimus?
              </p>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Home;
