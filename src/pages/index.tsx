// app/page.tsx (for App Router projects)
"use client";
import React, { useState } from "react";
import axios from "axios";

export default function LinkedInTestSite() {
  const [apikey, setApikey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [proxyType, setProxyType] = useState("internal"); // default
  const [proxyLocation, setProxyLocation] = useState("");
  const [proxyHost, setProxyHost] = useState("");
  const [proxyPort, setProxyPort] = useState("");
  const [proxyUsername, setProxyUsername] = useState("");
  const [proxyPassword, setProxyPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://stagingapi.we-link.ai";

  const callAPI = async (endpoint: string, data: unknown, p0: { email: string; password: string; proxy: { location: string; host?: undefined; port?: undefined; username?: undefined; password?: undefined; } | { host: string; port: string; username: string; password: string; location?: undefined; }; }) => {
    console.log(`Calling API: data: ${JSON.stringify(data)}`);
    try {
      const res = await axios({
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseURL}/api/v1${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': process.env.WELINK_API_SECRET || apikey,
          'x-api-secret': secretKey,
        },
        data: data
      });
      alert(`Success: ${JSON.stringify(res.data)}`);
    } catch (err: unknown) {
      console.error(`Error calling API: ${err}`);
      if (typeof err === "object" && err !== null) {
        const errorObj = err as { response?: { data?: { message?: string } }, message?: string };
        alert(`Error: ${errorObj.response?.data?.message || errorObj.message || "Unknown error"}`);
      } else {
        alert(`Error: ${String(err)}`);
      }
    }
  };


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">LinkedIn API Test Dashboard</h1>

      <Section title="Set apikey and secret key">
        <TextInput label="apikey" value={apikey} onChange={setApikey} />
        <TextInput label="secret key" value={secretKey} onChange={setSecretKey} />
      </Section>

      <Section title="Login to LinkedIn">
        <TextInput label="Email" value={email} onChange={setEmail} />
        <TextInput label="Password" type="password" value={password} onChange={setPassword} />

        {/* Proxy Type Selection */}
        <select
          value={proxyType}
          onChange={(e) => setProxyType(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2"
        >
          <option value="internal">Internal Proxy</option>
          <option value="custom">Custom Proxy</option>
        </select>

        {proxyType === "internal" ? (
          <TextInput label="Location" value={proxyLocation} onChange={setProxyLocation} />
        ) : (
          <>
            <TextInput label="Host" value={proxyHost} onChange={setProxyHost} />
            <TextInput label="Port" value={proxyPort} onChange={setProxyPort} />
            <TextInput label="Username" value={proxyUsername} onChange={setProxyUsername} />
            <TextInput label="Password" value={proxyPassword} onChange={setProxyPassword} />
          </>
        )}

        <ActionButton
          label="Login"
          onClick={() => {
            const proxy =
              proxyType === "internal"
                ? { location: proxyLocation }
                : {
                  host: proxyHost,
                  port: proxyPort,
                  username: proxyUsername,
                  password: proxyPassword,
                };

            callAPI("/login", "POST", {
              email,
              password,
              proxy,
            });
          }}
        />
      </Section>


      {/* <Section title="Login to LinkedIn in faster way">
      <ActionButton label="Login_v2" onClick={() => callAPI("/login_v2", "POST")} />
    </Section> */}

      {/* <Section title="Fetch Own Profile Details">
      <ActionButton label="Fetch Profile" onClick={() => callAPI("linkedin/profile")} />
    </Section>

    <Section title="Submit OTP">
      <ActionButton label="Submit OTP" onClick={() => callAPI("linkedin/otp", "POST")} />
    </Section>

    <Section title="Get All LinkedIn Accounts">
      <ActionButton label="Get Accounts" onClick={() => callAPI("linkedin/accounts")} />
    </Section>

    <Section title="Get LinkedIn Companies">
      <ActionButton label="Get Companies" onClick={() => callAPI("linkedin/companies")} />
    </Section>

    <Section title="Get LinkedIn Groups">
      <ActionButton label="Get Groups" onClick={() => callAPI("linkedin/groups")} />
    </Section>

    <Section title="Who Viewed Your Profile">
      <ActionButton label="Get Viewers" onClick={() => callAPI("linkedin/viewers")} />
    </Section>

    <Section title="Delete LinkedIn Account">
      <ActionButton label="Delete Account" onClick={() => callAPI("linkedin/delete", "DELETE")} />
    </Section>

    <Section title="Send Invite Request">
      <ActionButton label="Send Invite" onClick={() => callAPI("linkedin/invite", "POST")} />
    </Section>

    <Section title="Fetch 1st Connections">
      <ActionButton label="Get Connections" onClick={() => callAPI("linkedin/connections")} />
    </Section>

    <Section title="Pending Invitations">
      <ActionButton label="Pending Invites" onClick={() => callAPI("linkedin/pending-invites")} />
    </Section>

    <Section title="Withdraw Invite">
      <ActionButton label="Withdraw Invite" onClick={() => callAPI("linkedin/invite/withdraw", "POST")} />
    </Section>

    <Section title="Disconnect 1st Connection">
      <ActionButton label="Disconnect" onClick={() => callAPI("linkedin/disconnect", "POST")} />
    </Section>

    <Section title="Get LinkedIn Profile Details (by URL)">
      <TextInput label="Profile URL" value={profileUrl} onChange={setProfileUrl} />
      <ActionButton
        label="Get Profile Details"
        onClick={() => callAPI("linkedin/profile-details", "POST", { url: profileUrl })}
      />
    </Section> */}

      {/* <Section title="Get Contact Details (by URL)">
      <TextInput label="Profile URL" value={profileUrl} onChange={setProfileUrl} />
      <ActionButton
        label="Get Contact"
        onClick={() => callAPI("linkedin/contact-details", "POST", { url: profileUrl })}
      />
    </Section> */}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border p-4 rounded-lg shadow space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function TextInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (val: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        placeholder={label}
      />
    </div>
  );
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {label}
    </button>
  );
}