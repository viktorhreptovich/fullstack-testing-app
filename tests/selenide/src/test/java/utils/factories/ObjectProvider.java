package utils.factories;

import org.apache.commons.lang3.reflect.ConstructorUtils;

import java.lang.reflect.InvocationTargetException;

public class ObjectProvider {

    public static <T> T instance(final Class<T> objectClass, final Object... args) {
        Class<T> instanceClass = objectClass;
        String instanceClassName = objectClass.getName();
        try {
            instanceClass = (Class<T>) Class.forName(instanceClassName);
            T instanceObject = ConstructorUtils.invokeConstructor(instanceClass, args);
            if (instanceObject == null) {
                throw new NoSuchMethodException("Can not find matching accessible constructor");
            }
            return instanceObject;
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException
                 | ClassNotFoundException | NoSuchMethodException e) {
            throw new Error("Can not create instance of class " + instanceClassName, e.getCause());
        }
    }

}
