import c from './style.module.css';

const Loader = () => {

  return (
    <div className={c.wrap}>
      <div className={c.clock}></div>
      <div className={c.loadingText}>
        loading<span className={c.dot}></span><span className={c.dot}></span><span className={c.dot}></span>
      </div>
    </div>
  );
};

export {
  Loader
}
