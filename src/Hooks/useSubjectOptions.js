import { useMemo } from "react";

const useSubjectOptions = () => {
  const subjectOptions = useMemo(
    () => [
      { value: "mathematics", label: "Mathematics" },
      { value: "physics", label: "Physics" },
      { value: "chemistry", label: "Chemistry" },
      { value: "biology", label: "Biology" },
      { value: "higher-math", label: "Higher Mathematics" },
      { value: "bangla", label: "Bangla" },
      { value: "english", label: "English" },
      { value: "history", label: "History" },
      { value: "geography", label: "Geography" },
      { value: "economics", label: "Economics" },
      { value: "civics", label: "Civics" },
      { value: "islamic-studies", label: "Islamic Studies" },
      { value: "accounting", label: "Accounting" },
      { value: "finance", label: "Finance" },
      { value: "business-studies", label: "Business Studies" },
      { value: "marketing", label: "Marketing" },
      { value: "arabic", label: "Arabic" },
      { value: "french", label: "French" },
      { value: "german", label: "German" },
      { value: "spanish", label: "Spanish" },
      { value: "japanese", label: "Japanese" },
      { value: "chinese", label: "Chinese" },
      { value: "programming", label: "Programming" },
      { value: "web-development", label: "Web Development" },
      { value: "database", label: "Database" },
      { value: "networking", label: "Networking" },
      { value: "ms-office", label: "MS Office" },
      { value: "graphics-design", label: "Graphics Design" },
      { value: "medical-prep", label: "Medical Admission" },
      { value: "engineering-prep", label: "Engineering Admission" },
      { value: "university-prep", label: "University Admission" },
      { value: "bcs-prep", label: "BCS Preparation" },
      { value: "ielts", label: "IELTS" },
      { value: "toefl", label: "TOEFL" },
      { value: "gre", label: "GRE" },
      { value: "gmat", label: "GMAT" },
      { value: "sat", label: "SAT" },
      { value: "quran", label: "Quran & Tajweed" },
      { value: "music", label: "Music" },
      { value: "art", label: "Art & Drawing" },
      { value: "dance", label: "Dance" },
      { value: "yoga", label: "Yoga & Meditation" },
    ],
    [],
  );

  // Get subject label by value
  const getSubjectLabel = (value) => {
    const subject = subjectOptions.find((s) => s.value === value);
    return subject ? subject.label : value;
  };

  // Get all subjects
  const getAllSubjects = () => subjectOptions;

  return {
    subjectOptions,
    getSubjectLabel,
    getAllSubjects,
  };
};

export default useSubjectOptions;
