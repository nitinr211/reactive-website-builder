using System;
using System.Diagnostics;

//VIM INTO APP:
//sudo apt-get install xsel
//Install the vim-xsel plugin in Vim


namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            // Execute the xsel command and retrieve the output
            Process process = new Process();
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.FileName = "xsel";
            process.StartInfo.Arguments = "-o";
            process.Start();

            // Read the output from xsel
            string output = process.StandardOutput.ReadToEnd();

            // Print the output to the console
            Console.WriteLine(output);
        }
    }
}
