
export interface InfoPopup {
  title: string;
  info: string;
}

interface PropsPopup {
  infoPopup: InfoPopup;
  setOpenPopup: (open: boolean) => void;
}

function Popup({ infoPopup, setOpenPopup }: PropsPopup) {
  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#7ab899",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px #000000cc",
        left: "25%",
        top: "25%",
        padding: "80px",
      }}
    >
      <p onClick={handleClose} style={{ cursor: "pointer" }}>CERRAR</p>
      <p>{infoPopup.title}</p>
      <p>{infoPopup.info}</p>
    </div>
  );
}

export default Popup;
