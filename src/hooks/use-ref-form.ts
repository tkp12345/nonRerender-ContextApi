import {useRef, useState} from 'react';

// 폼 상태 타입 정의
type FormState<T> = {
    values: T;
    errors: Record<keyof T, string | undefined>;
    touched: Record<keyof T, boolean>;
};

type useFormReturn<T> = {
    formState: FormState<T>;
    handleValueChange: (name: keyof T, value: T[keyof T]) => void;
    handleBlur: (name: keyof T) => void;
    handleFormValues: () => T;
};

export function useForm<T>(initialValues: T): useFormReturn<T> {
    // 폼 상태 초기화
    const formStateRef = useRef<FormState<T>>({
        values: initialValues,
        errors: {} as Record<keyof T, string | undefined>,
        touched: {} as Record<keyof T, boolean>,
    });

    // form 상태 저장 state
    const [formValues, setFormValues] = useState<T>(formStateRef.current.values);

    // form 값 변경 처리 함수
    const handleValueChange = <K extends keyof T>(name: K, value: T[K]) => {
        formStateRef.current.values[name] = value;
        setFormValues(formStateRef.current.values);
    };

    // form 포커스 아웃(Blur) 처리 함수
    const handleBlur = (name: keyof T) => {
        formStateRef.current.touched[name] = true;
    };

    // 폼 데이터 반환 함수
    const handleFormValues = (): T => {
        return formValues;
    };

    return {
        formState: formStateRef.current,
        handleValueChange,
        handleFormValues,
        handleBlur,
    };
}
