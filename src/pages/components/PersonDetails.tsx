import React from "react";
import { withConditionalRender } from "../../enhancers/withConditionalRender";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Person from "@material-ui/icons/Person";
import capitalize from "../functions/capitalize";

const component = (props: any) => {
  const { value, setValue, onClose } = props;

  const clearButtonHandler = () => onClose();
  return (
    <div className="details">
      <div className="athlete-name">
        <IconButton>
          <Person />
        </IconButton>
        <div className="full-name-and-group">
          <div className="full-name">{capitalize(value.name)} </div>
          <div className="athlete-group">({value.group})</div>
        </div>
        <div className="clear-button" onClick={clearButtonHandler}>
          <IconButton>
            <Close />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export const PersonDetails = withConditionalRender(component);
