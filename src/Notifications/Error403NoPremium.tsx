import { FC } from "react";
import { capitalizeWords } from "../helpers/capitalizeWord";

interface IProps {
  status: number;
  reason: string;
}
const Error403NoPremium: FC<IProps> = ({ status, reason }) => {
  const capReason = capitalizeWords(reason);
  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
      }}
    >
      <div style={{ fontWeight: "bold", color: "tomato" }}>
        Error {status}: {capReason}
      </div>
      <div>Player commands require a premium spotify account</div>
    </div>
  );
};

export default Error403NoPremium;
