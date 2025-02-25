import moment from "moment";
const ConsumptionDays = ({ date, adultsCount, childrenCount }) => {
  const formattedDate = moment(date).format('MMM D, YYYY'); 

  return (
    <div className="bg-light d-flex justify-content-between p-2 mt-2 mb-2 rounded">
      <strong>Date: {formattedDate}</strong>
      <br />
      <strong>Adults: {adultsCount}</strong>
      <br />
      <strong>Children: {childrenCount}</strong>
      <br />
    </div>
  );
};

export default ConsumptionDays;
