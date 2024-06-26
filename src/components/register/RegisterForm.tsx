import { useFieldArray, useForm } from "react-hook-form";
import { LOCAL_STORAGE_ALL_MEMBERS_KEY } from "../../CONST";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { MemberInfoType } from "../shuffle/Shuffle";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { pathsObj } from "../../pathsObj";
import { Button } from "../buttons/Button";

type InputType = {
  memberName: string;
};

type FormValuesType = {
  members: InputType[];
};

export const RegisterForm = () => {
  const navigate: NavigateFunction = useNavigate();
  const initialMemberInput: InputType = { memberName: "" };
  const { register, handleSubmit, control, reset } = useForm<FormValuesType>({
    defaultValues: {
      members: [initialMemberInput],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const onSubmit = (data: FormValuesType): void => {
    const inputData: InputType[] = data.members.filter(
      (member) => member.memberName !== ""
    );
    const registerData: MemberInfoType[] = inputData.map((member, index) => {
      return { id: index + 1, memberName: member.memberName, isInclude: true };
    });
    const jsonArray: string = JSON.stringify(registerData);
    localStorage.setItem(LOCAL_STORAGE_ALL_MEMBERS_KEY, jsonArray);

    reset();
    navigate(pathsObj.home);
  };

  return (
    <div className="w-full md:w-1/2 py-8">
      <div className="mb-4">
        <h2 className="text-white font-bold">メンバー登録</h2>
        <p className="text-white">すべてのメンバーを登録しよう！</p>
      </div>
      <div className="flex flex-col gap-8 ">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <label htmlFor={`member_${index}`} className="text-white">
                    {index + 1}
                  </label>
                  <input
                    id={`member_${index}`}
                    {...register(`members.${index}.memberName`)}
                    className="w-full px-1 py-1.5 text-sm rounded-md"
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="primary"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-red" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={() => append(initialMemberInput)}
              className="flex gap-2 justify-center items-center bg-blue rounded-md text-white"
            >
              <>
                <FontAwesomeIcon icon={faPlus} />
                <span>メンバーを追加</span>
              </>
            </Button>
          </div>

          <Button
            type="submit"
            onClick={() => onSubmit}
            className="flex gap-2 justify-center items-center bg-green rounded-md text-white"
          >
            <>
              <FontAwesomeIcon icon={faUserPlus} />
              <span>登録</span>
            </>
          </Button>
        </form>
      </div>
    </div>
  );
};
