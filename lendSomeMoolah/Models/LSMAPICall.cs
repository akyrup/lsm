using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace lendSomeMoolah.Models
{
    public class LSMAPICall
    {
        public const string APIURL = "https://virtserver.swaggerhub.com/i6643/lendSomeMoolah/1.0.0/";

        public string stateLessLogin()
        {
            return WebRequestCall(APIURL + "stateLessLogin");
        }
        public string loans(string userName)
        {
            return WebRequestCall(APIURL + "loans/"+userName);
        }
        public string fundLoan()
        {
            return WebRequestCall(APIURL + "fundLoan");
        }
        public string requestLoan()
        {
            return WebRequestCall(APIURL + "requestLoan");
        }



        public string WebRequestCall(string URL)
        {
            string ResponseData = string.Empty;

            try
            {
                // Create a request for the URL. 		
                WebRequest request = WebRequest.Create(URL);
                // If required by the server, set the credentials.
                request.Credentials = CredentialCache.DefaultCredentials;
                // Get the response.
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                // Display the status.
                Console.WriteLine(response.StatusDescription);
                // Get the stream containing content returned by the server.
                Stream dataStream = response.GetResponseStream();
                // Open the stream using a StreamReader for easy access.
                StreamReader reader = new StreamReader(dataStream);
                // Read the content.
                //string responseFromServer = reader.ReadToEnd();
                ResponseData = reader.ReadToEnd();
                // Display the content.
               // Console.WriteLine(responseFromServer);
                // Cleanup the streams and the response.
                reader.Close();
                dataStream.Close();
                response.Close();
            }
            catch { }
            return ResponseData;
        }
    }
}