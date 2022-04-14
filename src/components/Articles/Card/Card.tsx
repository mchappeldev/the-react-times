import { CardProps } from "../../../Interfaces";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const Card = (props: CardProps) => {
  return (
    <div key={props.i} className="card">
      <a href={props.article.short_url}>
        <div
          className="thumb"
          style={{
            backgroundImage: `url(${props.article.multimedia[1].url})`,
          }}
        ></div>
        <article>
          <h2>{props.article.title}</h2>
          <p>{props.article.abstract}</p>

          <h3>
            {props.article.byline} {dayjs.tz(props.article.published_date, "Pacific/Fiji").format("MM/DD/YYYY HH:mm A [FJT]")}
          </h3>
        </article>
      </a>
    </div>
  );
};

export default Card;
