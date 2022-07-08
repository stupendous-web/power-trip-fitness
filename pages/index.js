import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import imagesloaded from "imagesloaded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/Logo";

export default function Home() {
  const [offcanvas, setOffcanvas] = useState(false);
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const slides = [
    "/images/slides/1.jpg",
    "/images/slides/2.jpg",
    "/images/slides/3.jpg",
    "/images/slides/4.jpg",
  ];
  useEffect(() => {
    axios
      .get(
        "https://public-api.wordpress.com/rest/v1.1/sites/powertripfitness.wordpress.com"
      )
      .then((response) => {
        setDescription(response.data.description);
      });
    axios
      .get(
        "https://public-api.wordpress.com/rest/v1.1/sites/powertripfitness.wordpress.com/posts/"
      )
      .then((response) => {
        setPosts(response.data.posts);
      });
    imagesloaded(document, () => {
      setLoading(false);
    });
  }, []);
  return (
    <>
      {" "}
      <Head>
        <title>
          Power Trip Fitness | Healthy community through exercise, wellness, and
          connection
        </title>
      </Head>
      <>
        <nav
          className={"uk-navbar uk-navbar-container"}
          uk-sticky={"cls-inactive: uk-navbar-transparent"}
        >
          <div className={"uk-navbar-left"}>
            <a
              href={"/"}
              title={
                "Power Trip Fitness | Healthy community through exercise, wellness, and connection"
              }
              className={"uk-navbar-item uk-logo"}
            >
              <img src={"/images/nav.png"} height={"60"} width={"60"} />
            </a>
          </div>
          <div className={"uk-navbar-right"}>
            <ul className={"uk-navbar-nav uk-visible@s"}>
              {posts &&
                posts.map((post) => {
                  return (
                    <li key={post.slug}>
                      <a
                        href={"#" + post.slug}
                        title={post.title}
                        uk-scroll={"offset: 81"}
                      >
                        {post.title}
                      </a>
                    </li>
                  );
                })}
              <li>
                <a href={"#location"} title={"Location"} uk-scroll={""}>
                  Location
                </a>
              </li>
              <li>
                <a href={"#contact"} title={"Contact Us"} uk-scroll={""}>
                  Contact Us
                </a>
              </li>
            </ul>
            <a
              className={"uk-navbar-item"}
              onClick={() => setOffcanvas(!offcanvas)}
            >
              <FontAwesomeIcon
                icon={faBars}
                color={"hsl(35.52941176, 90%, 85%)"}
              />
            </a>
          </div>
        </nav>
        {offcanvas && (
          <div>
            <div className={"uk-overlay uk-overlay-default"}>asdf</div>
          </div>
        )}
        <div uk-grid={""}>
          <div className={"uk-width-1-3@s"} />
          <div className={"uk-width-2-3@s"}>
            <div
              className={"uk-position-relative uk-visible-toggle uk-light"}
              tabIndex={"-1"}
              uk-slideshow={
                "autoplay: true; autoplay-interval: 3000; pause-on-hover: false; ratio: false"
              }
            >
              <ul
                className={"uk-slideshow-items"}
                uk-height-viewport={"min-height: 300; offset-top: 80"}
              >
                {slides.map((slide, key) => {
                  return (
                    <li key={key}>
                      <img
                        src={slide}
                        alt={"Power Trip Fitness"}
                        uk-cover={""}
                      />
                    </li>
                  );
                })}
              </ul>
              <a
                className="uk-position-center-left uk-position-small uk-hidden-hover"
                href="#"
                uk-slidenav-previous
                uk-slideshow-item="previous"
              ></a>
              <a
                className="uk-position-center-right uk-position-small uk-hidden-hover"
                href="#"
                uk-slidenav-next
                uk-slideshow-item="next"
              ></a>
            </div>
          </div>
        </div>
        <div className={"uk-position-center-left"}>
          <div className={"uk-container"}>
            <p className={"uk-h1"}>{description}</p>
          </div>
        </div>
      </>
      <div className={"uk-section"}>
        <div className={"uk-container uk-container-xlarge"}>
          <p className={"uk-heading-medium"}>
            Power Trip is dedicated to improving the health of our community
            through exercise, wellness, and connecting like-minded people to
            live healthier. Let’s be powerful together!!!
          </p>
        </div>
      </div>
      <div className={"uk-container"}>
        {posts &&
          posts.map((post, key) => {
            if (key % 2 === 0) {
              return (
                <div className={"uk-section"} id={post.slug} key={key}>
                  <div
                    className={"uk-child-width-1-2 uk-flex-middle"}
                    uk-grid={""}
                  >
                    <div>
                      {post.featured_image && (
                        <img src={post.featured_image} alt={post.title} />
                      )}
                    </div>
                    <div>
                      <a href={"/" + post.slug} title={post.title}>
                        <h2>{post.title}</h2>
                      </a>
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className={"uk-section"} id={post.slug} key={key}>
                  <div
                    className={"uk-child-width-1-2 uk-flex-middle"}
                    uk-grid={""}
                  >
                    <div>
                      <a href={"/" + post.slug} title={post.title}>
                        <h1>{post.title}</h1>
                      </a>
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                    {post.featured_image && (
                      <div>
                        <img src={post.featured_image} alt={post.title} />
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div
        className={"uk-section uk-section-primary uk-section-large"}
        id={"contact"}
      >
        <div className={"uk-container uk-container-expand uk-text-center"}>
          <p className={"uk-h4"} uk-scrollspy={"uk-animation-fade"}>
            <a href={"mailto:ljhealthfitness@live.com"}>
              ljhealthfitness@live.com
            </a>
          </p>
          <p>
            <a href={"tel:15103326121"}>+1 (510) 332-6121</a>
          </p>
          <p>
            <a
              href={"https://instagram.com/powertripfitness"}
              className={"uk-margin-small-right"}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href={"https://facebook.com/Power-Trip-Fitness-308696302507293"}>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </p>
        </div>
      </div>
      <iframe
        src={
          "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12623.722727463495!2d-122.1512164!3d37.7213049!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2591f51d9bc60f86!2sPower%20Trip%20Fitness!5e0!3m2!1sen!2sus!4v1636065750913!5m2!1sen!2sus"
        }
        width={"100%"}
        height={"450"}
        style={{ border: 0 }}
        allowFullScreen
        loading={"lazy"}
        className={"uk-height-large"}
        id={"location"}
      />
      <div className={"uk-section uk-section-secondary uk-section-xsmall"}>
        <div className={"uk-container uk-container-expand"}>
          <div
            className={"uk-child-width-1-2@s uk-grid-collapse uk-text-small"}
            uk-grid={""}
            uk-scrollspy={"uk-animation-fade"}
          >
            <div>
              <p>
                &copy; Copyright{" "}
                <a href={"/"} title={"Power Trip Fitness in San Leandro"}>
                  Power Trip Fitness
                </a>{" "}
                2021. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Logo loading={loading} />
    </>
  );
}
