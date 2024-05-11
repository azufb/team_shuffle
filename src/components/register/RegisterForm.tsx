import { useFieldArray, useForm } from "react-hook-form";
import { LOCAL_STORAGE_ALL_MEMBERS_KEY } from "../../CONST";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";

type FormValuesType = {
  members: {
    memberName: string;
  }[];
};

export const RegisterForm = () => {
  const { register, handleSubmit, control, reset } = useForm<FormValuesType>({
    defaultValues: {
      members: [{ memberName: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const onSubmit = (data: FormValuesType): void => {
    const jsonArray: string = JSON.stringify(
      data.members.map((member, index) => {
        return { id: index, memberName: member.memberName, isInclude: true };
      })
    );
    localStorage.setItem(LOCAL_STORAGE_ALL_MEMBERS_KEY, jsonArray);

    reset();
  };

  const appendMember = () => {
    append({ memberName: "" });
  };

  return (
    <div className="py-8">
      <div className="mb-8">
        <h2 className="text-white font-bold">メンバー登録</h2>
        <p className="text-white">すべてのメンバーを登録しよう！</p>
      </div>

      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <label htmlFor={`member_${index}`} className="text-white">
                  メンバー{index + 1}
                </label>
                <input
                  id={`member_${index}`}
                  {...register(`members.${index}.memberName`)}
                  className="px-1 py-1.5 text-sm rounded-md"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="primary"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-red" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={appendMember}
            className="flex gap-2 justify-center items-center border border-blue bg-blue rounded-md text-white"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>メンバーを追加</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="flex gap-2 justify-center items-center border border-green bg-green rounded-md text-white"
        >
          <FontAwesomeIcon icon={faUserPlus} />
          <span>登録</span>
        </button>
      </form>
    </div>
  );
};
