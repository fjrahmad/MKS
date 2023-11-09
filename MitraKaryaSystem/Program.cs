using API.Context;
using API.Repository;
using API.Repository.Interfaces;
using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using MitraKaryaSystem.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddAuthentication("AuthScheme").AddCookie("AuthScheme", options =>
	{
		options.LoginPath = "/Auth/Login"; // Set the login path
		options.LogoutPath = "/Auth/Logout"; // Set the logout path
		options.ReturnUrlParameter = "/Home/Index"; // Set the return URL parameter
	});

// Register the AuthService that implements the IAuthService interface
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddDbContext<MKSContext>(options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("MKS"));
});
builder.Services.AddAuthorization(options =>
{
	options.DefaultPolicy = new AuthorizationPolicyBuilder()
		.AddAuthenticationSchemes("AuthScheme")
		.RequireAuthenticatedUser()
		.Build();
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseAuthenticationMiddleware();
app.UseAuthorization();
app.MapControllerRoute(
	name: "default",
	pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
