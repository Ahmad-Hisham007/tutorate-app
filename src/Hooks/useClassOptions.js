import { useMemo } from "react";

const useClassOptions = () => {
  const classOptions = useMemo(
    () => [
      // School (Class 1-12)
      { value: "1", label: "Class 1" },
      { value: "2", label: "Class 2" },
      { value: "3", label: "Class 3" },
      { value: "4", label: "Class 4" },
      { value: "5", label: "Class 5" },
      { value: "6", label: "Class 6" },
      { value: "7", label: "Class 7" },
      { value: "8", label: "Class 8" },
      { value: "9", label: "Class 9" },
      { value: "10", label: "Class 10" },
      { value: "11", label: "Class 11" },
      { value: "12", label: "Class 12" },

      // O-Level / IGCSE
      { value: "o-level", label: "O-Level / IGCSE" },
      { value: "as-level", label: "AS-Level" },
      { value: "a-level", label: "A-Level" },

      // Undergraduate
      { value: "bachelor-1", label: "Bachelor's Year 1" },
      { value: "bachelor-2", label: "Bachelor's Year 2" },
      { value: "bachelor-3", label: "Bachelor's Year 3" },
      { value: "bachelor-4", label: "Bachelor's Year 4" },

      // Postgraduate
      { value: "masters", label: "Master's" },
      { value: "phd", label: "PhD" },

      // Other
      { value: "professional", label: "Professional Course" },
      { value: "hobby", label: "Hobby/Life-long Learning" },
      { value: "other", label: "Other" },
    ],
    [],
  );

  const getClassLabel = (value) => {
    const option = classOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const getClassOptions = () => classOptions;

  return {
    classOptions,
    getClassLabel,
    getClassOptions,
  };
};

export default useClassOptions;
