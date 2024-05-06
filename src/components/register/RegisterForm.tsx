import { useFieldArray, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { addMembersSelector } from "../../recoil/states";

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
  const setMembers = useSetRecoilState(addMembersSelector);

  const onSubmit = (data: FormValuesType): void => {
    setMembers(data.members.map((member) => member.memberName));

    reset();
  };

  const appendMember = () => {
    append({ memberName: "" });
  };

  return (
    <div>
      <h2>メンバー登録</h2>
      <form>
        {fields.map((field, index) => (
          <div key={field.id}>
            <label>名前_{index + 1}</label>
            <div>
              <input {...register(`members.${index}.memberName`)} />
              <button type="button" onClick={() => remove(index)}>
                削除
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={appendMember}>
          メンバーを追加
        </button>

        <div>
          <button type="button" onClick={handleSubmit(onSubmit)}>
            登録
          </button>
        </div>
      </form>
    </div>
  );
};
