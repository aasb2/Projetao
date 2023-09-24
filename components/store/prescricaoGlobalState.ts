import { DocumentReference } from "firebase/firestore";

interface GlobalState {
  userExercises: ExerciseStruct[];
  prescriptionRef: DocumentReference | null
}

const globalState: GlobalState = {
  userExercises: [],
  prescriptionRef: null
};

interface ExerciseStruct {
  exerciseName: string;
  sets: SetStruct[];
  checked: boolean;
}

interface SetStruct {
  load: number;
  reps: number;
}
export default globalState;

export type { ExerciseStruct };
