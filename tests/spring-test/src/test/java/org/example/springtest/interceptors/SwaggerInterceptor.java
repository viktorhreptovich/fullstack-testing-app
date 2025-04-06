package org.example.springtest.interceptors;

import com.github.viclovsky.swagger.coverage.CoverageOutputWriter;
import com.github.viclovsky.swagger.coverage.FileSystemOutputWriter;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.parameters.HeaderParameter;
import io.swagger.v3.oas.models.parameters.QueryParameter;
import io.swagger.v3.oas.models.parameters.RequestBody;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.servers.Server;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.Objects;

import static java.lang.String.valueOf;

public class SwaggerInterceptor implements Interceptor {

    private static final String OUTPUT_DIRECTORY = "target/swagger-coverage-output";

    private final CoverageOutputWriter writer;

    public SwaggerInterceptor() {
        this.writer = new FileSystemOutputWriter(Paths.get(OUTPUT_DIRECTORY));
    }

    @Override
    public Response intercept(Chain chain) throws IOException {
        Operation operation = new Operation();

        Request request = chain.request();

        request.url().queryParameterNames().forEach(
            parameter -> operation.addParametersItem(
                new QueryParameter()
                    .name(parameter)
                    .example(request.url().queryParameter(parameter)
                    )
            )
        );


        request.headers().toMultimap().forEach((k, v) ->
            operation.addParametersItem(
                new HeaderParameter().name(k)
                    .example(v)
            )
        );

        try {
            if (Objects.nonNull(request.body())) {
                MediaType mediaType = new MediaType();
                mediaType.setSchema(new Schema());
                //Ignore ClassCastException for https://github.com/rest-assured/rest-assured/issues/1232

                operation.requestBody(
                    new RequestBody().content(
                        new Content().addMediaType(request.body().contentType().type(), mediaType)));

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        Response response = chain.proceed(request);

        operation.responses(
            new ApiResponses()
                .addApiResponse(
                    valueOf(response.code()),
                    new ApiResponse().content(
                        new Content().addMediaType(response.header("Content-Type"), new MediaType())
                    )
                )
        );

        PathItem pathItem = new PathItem();
        pathItem.operation(PathItem.HttpMethod.valueOf(request.method().toUpperCase()), operation);
        OpenAPI openApi = new OpenAPI()
            .addServersItem(new Server().url(request.url().host() + request.url().url().getPath()))
            .path(request.url().encodedPath(), pathItem);

        writer.write(openApi);

        return response;
    }

}
