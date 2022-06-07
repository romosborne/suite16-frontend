var builder = WebApplication.CreateBuilder(args);
builder.Logging.AddSimpleConsole(o => {
    o.IncludeScopes = true;
    o.SingleLine = true;
});

// Add services to the container.
builder.Services.Configure<Suite16ComOptions>(builder.Configuration.GetRequiredSection(Suite16ComOptions.Position));
builder.Services.AddSingleton<IStateService, StateService>();
builder.Services.AddSingleton<ISuite16ComService, Suite16ComService>();

builder.Services.AddControllersWithViews();

var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (!app.Environment.IsDevelopment()) {
//     // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//     app.UseHsts();
// }

// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseAuthentication();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
