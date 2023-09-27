import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.AboutContainer}>
      <h2 className={styles.About}>
        Hola!! Soy Juan Ubaldi, Desarrollador Fullstack
      </h2>
      <h2 className={styles.Component}>estudiante de Soy Henry 🚀</h2>
      <img src="./cockerJuan.jpg" alt="" className={styles.AboutImg} />
    </div>
  );
};

export default About;
