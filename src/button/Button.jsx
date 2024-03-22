//import styles from './Button.module.css'

//react에서 CSS components를 적용하는 방법
//외부 css에서 import   - 대체적으로 통용
//css modules    
//코드 내부에서 js 객체  - 미니멀리즘
//..
function Button(){

    const styles ={
            backgroundColor: "hsl(200, 100%, 50%)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
    }

//    return(<button className={styles.button}>Click me</button>);
    return(<button styles={styles}>Click me</button>);
}

export default Button