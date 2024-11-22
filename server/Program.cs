using Microsoft.EntityFrameworkCore;
using Server.Data;

var builder = WebApplication.CreateBuilder(args);

// 添加服务到容器中

// 注册 Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 注册 DbContext 服务
builder.Services.AddDbContext<AirNotebookContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 添加控制器支持
builder.Services.AddControllers();

// 修改监听地址为 0.0.0.0:80（Docker 环境需要）
builder.WebHost.UseUrls("http://0.0.0.0:80");

var app = builder.Build();

// 配置中间件

// 在开发环境启用 Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Air Notebook API V1");
    });
}

// 如果需要 HTTPS 重定向，请启用以下行（生产环境推荐）
// app.UseHttpsRedirection();

app.UseRouting(); // 配置路由
app.UseAuthorization(); // 配置授权

// 将控制器映射到路由
app.MapControllers();

// 运行应用
app.Run();