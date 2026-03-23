const FromNewBoard = () => {
  return (
    <div className="bg-base-100 p-8 rounded-3xl">
      <p className="font-bold text-lg">Create a new feedback board</p>

      <label className="form-control w-full  ">
        <div className="label">
          <span className="label-text">Board name</span>
        </div>

        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
        />
      </label>

      <button className="btn btn-primary btn-block">Create Board</button>
    </div>
  );
};

export default FromNewBoard;
