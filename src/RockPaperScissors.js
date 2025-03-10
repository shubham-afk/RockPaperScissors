import "./App.css";
import { useState } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import "./App.css";
import GlowingText from "./glowingtext";
import rockImg from "./Images/rock.jpeg";
import Slide from "@mui/material/Slide";
import paperImg from "./Images/paper.jpeg";
import scissorsImg from "./Images/scissors.jpeg";

const choices = [
  { name: "ROCK", img: rockImg },
  { name: "PAPER", img: paperImg },
  { name: "SCISSORS", img: scissorsImg },
];

export default function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [round, setRound] = useState(1);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [openRoundDialog, setOpenRoundDialog] = useState(false);

  const randomUserChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const selectComputerChoice = (userChoice) => {
    if (round === 4) {
      return;
    }
    const computerChoice = randomUserChoice();
    setComputerChoice(computerChoice.name);
    setUserChoice(userChoice.name);
    setOpenRoundDialog(true);
    finalResult(userChoice.name, computerChoice.name);
  };

  const finalResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      setResult("tied");
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      setResult("won");
      setUserScore(userScore + 1);
    } else {
      setResult("lost");
      setComputerScore(computerScore + 1);
    }
    setRound(round + 1);
  };
  const resetPlay = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setRound(1);
    setUserScore(0);
    setComputerScore(0);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="sm" className="game-container">
        <h1
          className="title fancy-title"
          display="flex"
          justifyContent="space-around"
        >
          Rock Paper Scissors
        </h1>
        <Box
          className="choices-container"
          display="flex"
          justifyContent="space-around"
          m={10}
        >
          {choices.map((choice) => (
            <Button
              key={choice.name}
              className="choice-button"
              onClick={() => selectComputerChoice(choice)}
            >
              <img src={choice.img} alt={choice.name} className="choice-img" />
            </Button>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <button onClick={resetPlay}>
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                fill="currentColor"
              ></path>
            </svg>
            <span>Play Again</span>
          </button>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {round === 4 && (
            <Typography variant="h5">
              {userScore > computerScore ? (
                <GlowingText text="You Won the Game" />
              ) : (
                <GlowingText text="You Lost the Game" />
              )}
            </Typography>
          )}
        </Box>
        <Dialog
          open={openRoundDialog}
          onClose={() => setOpenRoundDialog(false)}
          TransitionComponent={Slide}
          TransitionProps={{ direction: "up" }} // Smooth slide from bottom
          sx={{
            "& .MuiDialog-paper": {
              background:
                "linear-gradient(135deg, rgba(20,20,20,0.9), rgba(40,40,40,0.95))",
              borderRadius: "15px",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
              border: "2px solid rgba(0, 255, 255, 0.3)",
              color: "#fff",
              willChange: "transform, opacity", // Hardware acceleration
              transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#0ff",
              textShadow:
                "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6)",
            }}
          >
            Round {round - 1} Result
          </DialogTitle>
          <DialogContent sx={{ textAlign: "center", fontSize: "1.2rem" }}>
            <Typography className="Choices">
              User Choice: {userChoice}
            </Typography>
            <Typography className="Choices">
              Computer Choice: {computerChoice}
            </Typography>
            <Typography
              className="Choices"
              sx={{
                fontWeight: "bold",
                color: result === "Win" ? "#0f0" : "#f00",
              }}
            >
              You {result} this round
            </Typography>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
