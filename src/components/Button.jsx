import "./Button.css"

//props 에 따라서 다르게 보이도록 
const Button = ({ text, type, onClick }) => {
    return (
        <button
            onClick={onClick} // 전달받은 onClick 함수를 button의 onClick 이벤트로 설정
            className={`Button Button_${type}`}
        >
            {text}
        </button>
    );
};

export default Button;