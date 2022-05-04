import Load from '../load/Load';

function ProcessedImage(props) {
  let content = <h1 className='font-bold'>{props.initLabel}</h1>;

  if (props.loading) {
    content = <Load></Load>;
  } else if (props.image != null) {
    content = <img src={props.image} alt='' />;
  }

  if (props.error) {
    content = (
      <div>
        <h1>Sorry Error!</h1>
      </div>
    );
  }

  return <div className='w-full text-center border bg-white shadow-sm rounded-lg'>{content}</div>;
}

export default ProcessedImage;
