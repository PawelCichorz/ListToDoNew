import React from "react";

type EditingContextType = {
  modalOpen: boolean;
  title: string;
  desc: string;
  isEditing: boolean;
  setDesc: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
  setTitle: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
  setIsEditing: (value: boolean) => void;
  setModalOpen: (value: boolean) => void;
  setTitleState: (value: string) => void;
  setDescState: (value: string) => void;
};

const EditingContext = React.createContext<EditingContextType>({
  modalOpen: false,
  title: "",
  desc: "",
  isEditing: false,

  setDesc: () => {},
  setTitle: () => {},
  setIsEditing: () => {},
  setModalOpen: () => {},
  setTitleState: () => {},
  setDescState: () => {},
});

export default EditingContext;
