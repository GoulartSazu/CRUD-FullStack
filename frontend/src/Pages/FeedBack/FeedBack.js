import { useState, useEffect } from "react";
import { Finish, Input } from "./Styles";
import { Container } from "../../styles/global";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import axios from "axios";

function FeedBack() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [titleSub, setTitleSub] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [rating, setRating] = useState(0);
  const hash = localStorage.getItem("hash");
  const placa = localStorage.getItem("placa");
  const phrase = "QUEREMOS SEU FEEDBACK PARA EVOLUIR! 🚀";
  const phrase2 = "FIQUE A VONTADE PARA COLOCAR SUA AVALIAÇÃO ABAIXO! 🙏";
  const delay = 40;

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= phrase.length) {
        setTitle(phrase.slice(0, currentIndex));
        currentIndex += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, delay);

    return () => clearInterval(typingInterval);
  }, [phrase, delay]);

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval2 = setInterval(() => {
      if (currentIndex <= phrase2.length) {
        setTitleSub(phrase2.slice(0, currentIndex));
        currentIndex += 1;
      } else {
        clearInterval(typingInterval2);
      }
    }, delay);

    return () => clearInterval(typingInterval2);
  }, [phrase2, delay]);


  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const sendFeedback = async (e) => {
    e.preventDefault();

    await axios
      .post(`https://splashpg.com.br/ap/feedback`, {
        fdb_message: feedbackMessage.toUpperCase(),
        fdb_stars: rating,
        fdb_placa: placa ?? "-",
        fdb_hash: hash?.replace(/🔹/g, "") ?? "-",
      })
      .then(({ data }) => {
        toast.success(data);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        
      })
      .catch(({ response }) => toast.error(response.data));
  };

  const ratingTexts = {
    5: "PERFEITO 🤩",
    4: "MUITO BOM 😃",
    3: "MAIS OU MENOS 😶",
    2: "RUIM 😑",
    1: "PÉSSIMO 😕",
  };

  return (
    <>
      <Container>
        <Finish>
          <h2>
            {title}
            <br />
            <br />
            {titleSub}
          </h2>
          <form onSubmit={sendFeedback}>
            <StarRatings
              rating={rating}
              starHoverColor="yellow"
              starRatedColor="gold"
              changeRating={changeRating}
              numberOfStars={5}
              name="rating"
              starEmptyColor="white"
              starDimension="80px"
            />
            <h2 className="nota">
              {ratingTexts[rating]}
            </h2>
            <Input
              placeholder="Sugestão, melhoria ou crítica"
              name="feedback"
              type="text"
              onChange={(e) => {
                setFeedbackMessage(e.target.value);
              }}
            />
            <button type="submit">
              <div className="left"></div>
              ENVIAR FEEDBACK
              <div className="right"></div>
            </button>
          </form>
          {/* <div className="videos">
            <video muted autoPlay="autoplay" loop>
              <source
                src="http://fleming.mapa360.com.br/wp-content/uploads/2024/03/copy_BFC2B67E-ABF3-48B8-B80E-1CEC3E91E9C3.mp4"
                type="video/mp4"
              />
            </video>
            <video muted autoPlay="autoplay" loop>
              <source
                src="http://fleming.mapa360.com.br/wp-content/uploads/2024/03/copy_4E66255D-E4E9-4C68-B5D4-9518B4C3A12D.mp4"
                type="video/mp4"
              />
            </video>
          </div> */}
        </Finish>
      </Container>
    </>
  );
}

export default FeedBack;
