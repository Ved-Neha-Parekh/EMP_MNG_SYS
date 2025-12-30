import api from "../config/api.js";

export const clientController = {
  signUpPage(req, res) {
    return res.render("../views/pages/sign-up.ejs");
  },

  async handelSignUp(req, res) {
    try {
      const userData = req.body;

      await api.post("/register", userData);

      return res.redirect("/login");
    } catch (error) {
      console.log("Sign-Up Error: ", error.message);

      return res.redirect(req.get("Referrer") || "/");
    }
  },

  loginPage(req, res) {
    return res.render("../views/pages/login.ejs");
  },

  async handelLogin(req, res) {
    try {
      const { email, password } = req.body;

      const response = await api.post("/login", { email, password });

      const token = response.data.token;

      console.log("Token Received from API:", token);

      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 Day
      });

      return res.redirect("/");
    } catch (error) {
      console.log("Login Error: ", error.message);

      return res.redirect(req.get("Referrer") || "/");
    }
  },

  logout(req, res) {
    res.clearCookie("token");

    return res.redirect("/login");
  },

  viewDashboard(req, res) {
    return res.render("../index.ejs");
  },

  addEmployeePage(req, res) {
    return res.render("../views/pages/add-employee.ejs");
  },

  async renderViewEmployees(req, res) {
    try {
      const token = req.cookies.token;

      const response = await api.get("/employees", {
        headers: { Cookie: `token=${token}` },
      });

      return res.render("../views/pages/view-employees.ejs", {
        users: response.data.users,
        error: null,
      });
    } catch (error) {
      console.log("View Employees Error:", error.message);
      return res.render("../views/pages/view-employees.ejs", {
        users: [],
        error: "Failed to load data. Please try again.",
      });
    }
  },

  async deleteEmployee(req, res) {
    try {
      const { id } = req.params;

      const token = req.cookies.token;

      const response = await api.delete(`/delete-employee/${id}`, {
        headers: { Cookie: `token=${token}` },
      });

        return res.redirect("/view-employees");
    } catch (error) {
        console.log("Delete Employee Error:", error.message);
        return res.redirect("/view-employees");
    }
  },
};


// Update and single fetch remaining...